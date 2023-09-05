import { Schema, model } from 'mongoose'
import { IIncident, IIncidentModel } from './incident.interface'
import { status } from './incident.constants'

export const incidentSchema = new Schema<IIncident, IIncidentModel>(
  {
    bus_code: { type: String, required: true },
    description: { type: String, required: false },
    bus_id: { type: Schema.Types.ObjectId, ref: 'Bus' },
    cost: { type: Number },
    servicing_status: { type: String, enum: status, default: 'pending' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Incident = model<IIncident, IIncidentModel>(
  'Incident',
  incidentSchema
)
