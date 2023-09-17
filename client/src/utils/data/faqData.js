export const GeneralFQA = (panelStyle) => [
  {
    key: "1",
    label: (
      <h2 className="text-lg font-medium">
        What are the advantages of purchasing a bus ticket with redBus?
      </h2>
    ),
    children: (
      <>
        <p className="text-base">
          Dhruto travel is largest bus tickets and traveling company and
          therefore, you will find the largest option of bus seats on the site.
          Some of the advantages of dealing with us are:
        </p>
        <ul className="pl-6 list-outside">
          <li className="mb-2">
            <span className="text-base mr-2">•</span>You can choose your seat
          </li>
          <li className="mb-2">
            <span className="text-base mr-2">•</span>
            You can book your bus tickets online, by phone, or in person
          </li>
          <li className="mb-2">
            <span className="text-base mr-2">•</span>
            You can choose from over 1500+ bus operators
          </li>
          <li>
            <span className="text-base mr-2">•</span>
            You can choose from buses based on boarding points, timing, and bus
            type
          </li>
        </ul>
      </>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: (
      <h2 className="text-lg font-medium">
        Do I need to register to use Dhruto Travel?
      </h2>
    ),
    children: <p className="text-base">Do I need to register to use redBus?</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: (
      <h2 className="text-lg font-medium">Does booking online cost me more?</h2>
    ),
    children: (
      <p className="text-base">
        Not at all! The price of the bus ticket is the same as you would get
        from the bus operator too.The price of hotel voucher is the same or
        sometimes discounted depending on the season/time.
      </p>
    ),
    style: panelStyle,
  },
];

export const TicketFQA = (panelStyle) => [
  {
    key: "1",
    label: (
      <h2 className="text-lg font-medium">
        Is it mandatory to take a printout of the ticket?{" "}
      </h2>
    ),
    children: (
      <>
        <p className="text-base">
          It depends on the bus operator you have booked your ticket with. Even
          mTickets are available on redBus. For operators that support mTickets,
          the SMS that is sent to your mobile can be produced at the time of
          boarding and you will be allowed to travel.
        </p>
        <p className="text-base">
          For operators that do not support mTickets it is a must to take a
          printout of the e-ticket and produce it at the time of boarding. The
          e-ticket is sent to the e-mail ID provided at the time of boarding.
        </p>
        <p className="text-base">
          To know which operators are Ticket enabled, look for the mTicket icon
          under the mTicket column while searching for buses.
        </p>
      </>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: (
      <h2 className="text-lg font-medium">
        I've lost my ticket. What should I do now?
      </h2>
    ),
    children: (
      <p className="text-base">
        A copy of the ticket would have been sent to you by e-mail when you
        booked it. Please take a printout of that mail and produce it at the
        time of boarding. If you have not received the ticket e-mail, please
        call any of our call centers and our executive will re-send you a copy
        by mail.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: <h2 className="text-lg font-medium">What is an mTicket? </h2>,
    children: (
      <p className="text-base">
        An mTicket is an SMS that is sent to your mobile on booking a ticket
        with select operators. This SMS has the TIN number and the PNR number
        along with other ticket related information. It can be used to board the
        bus. Please note that not all operators accept mTickets. To know which
        operators are Ticket enabled, look for the mTicket icon under the
        mTicket column while searching for buses.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "4",
    label: (
      <h2 className="text-lg font-medium">
        I didn’t receive my Ticket. Can you re-send it?{" "}
      </h2>
    ),
    children: (
      <p className="text-base">
        You can generate your mTicket online. Click on the Print/SMS ticket link
        on the home page on www.redBus.in. Enter your TIN number mentioned on
        the e-ticket we e-mailed you. Choose the SMS option and click on Submit.
        In case you don’t have a copy of the e-ticket either, contact our call
        center and our executive will assist you.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "5",
    label: (
      <h2 className="text-lg font-medium">
        I entered the wrong mobile number while booking. Can I get my mTicket on
        a different number?{" "}
      </h2>
    ),
    children: (
      <p className="text-base">
        Sure you can. Please contact our call center and our executive will send
        you the mTicket on your desired number.
      </p>
    ),
    style: panelStyle,
  },
];
export const PaymentFQA = (panelStyle) => [
  {
    key: "1",
    label: (
      <h2 className="text-lg font-medium">
        Does the owner of the credit card with which the ticket is purchased
        need to be one of the passengers?
      </h2>
    ),
    children: (
      <>
        <p className="text-base">
          Not at all! A passenger can use any card to pay for the ticket, not
          necessarily their own. However, please note that the passenger in
          whose name the ticket is booked should carry a proof of his identity
          (along with the ticket) at the time of boarding the bus.
        </p>
      </>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: (
      <h2 className="text-lg font-medium">What payment options do I have? </h2>
    ),
    children: (
      <>
        <p className="text-base">The different payment options are</p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <span className="text-base mr-2">•</span>Credit card
          </li>
          <li className="mb-2">
            <span className="text-base mr-2">•</span>Debit card
          </li>
          <li className="mb-2">
            <span className="text-base mr-2">•</span>Mobile banking
          </li>
          <li>
            <span className="text-base mr-2">•</span>Bkash and Nagad
          </li>
        </ul>
      </>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: (
      <h2 className="text-lg font-medium">
        How does the transaction appear on my card / account statement?
      </h2>
    ),
    children: (
      <p className="text-base">
        Transactions on redBus will appear as REDBUS.IN, www.redbus.in in your
        bank statement.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "4",
    label: (
      <h2 className="text-lg font-medium">
        Is it safe to use my credit card on this site?
      </h2>
    ),
    children: (
      <p className="text-base">
        Transactions on redBus are very safe. We employ the best-in-class
        security and the transactions done are secure. Apart from being
        certified by Verisign, redBus uses Secure Socket Layers (SSL) data
        encryption. Using SSL ensures that the information exchanged with us is
        never transmitted unencrypted, thus protecting the information from
        being viewed by unauthorized individuals.
      </p>
    ),
    style: panelStyle,
  },
];

export const CancellationFQA = (panelStyle) => [
  {
    key: "1",
    label: (
      <h2 className="text-lg font-medium">Can I cancel my ticket online?</h2>
    ),
    children: (
      <>
        <p className="text-base mb-2">
          Most of the tickets can be cancelled online. However, there are some
          tickets that can only be cancelled through our call center.
        </p>
        <p className="text-base">
          However please note that the cancellation fee and cancellation period
          may differ for specific bus services. Please contact any of our
          executives for cancellation details on any specific service.
        </p>
      </>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: (
      <h2 className="text-lg font-medium">
        How can I cancel my bus ticket online?
      </h2>
    ),
    children: (
      <p className="text-base">How can I cancel my bus ticket online?</p>
    ),
    style: panelStyle,
  },
];
export const RefundFQA = (panelStyle) => [
  {
    key: "1",
    label: (
      <h2 className="text-lg font-medium">
        I missed the bus. Do I get a refund?
      </h2>
    ),
    children: (
      <p className="text-base mb-2">
        redBus provides a 100% refund if the bus is missed due to either redBus
        or its’ partner company's fault. However, if the bus is missed due to
        any other reason not directly related to redBus no refund is provided.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: (
      <h2 className="text-lg font-medium">
        How can I get a refund in case I cancel my ticket?
      </h2>
    ),
    children: (
      <p className="text-base">
        The refund is provided as per with our cancellation policy. The refund
        can be credited to the source of payment (Example: debit card, credit
        card, net banking) or credited to redBus wallet. Wallet credit can be
        used for bus booking in future (within 6 months of cancellation).
      </p>
    ),
    style: panelStyle,
  },
];
export const InsuranceFQA = (panelStyle) => [
  {
    key: "1",
    label: <h2 className="text-lg font-medium">Details on Insurance</h2>,
    children: (
      <p className="text-base mb-2">
        For details on Insurance please refer to Insurance Terms
      </p>
    ),
    style: panelStyle,
  },
];
