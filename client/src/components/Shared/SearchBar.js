import React from 'react';
import { Button, Col, DatePicker, Row, Input } from 'antd';
import moment from 'moment';

const SearchBar = () => {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };

      const disabledDate = current => {
        // Disable dates before today
        return current && current < moment().startOf('day');
      };

    return (
        <div className="search-bar">
            <Row className="bg-indigo-400 p-4 rounded-lg" gutter={[16, 16]}>
                <Col span={6}>
                    <Input className="p-2" placeholder="From" />
                </Col>
                <Col span={6}>
                    <Input className="p-2" placeholder="To" />
                </Col>
                <Col span={6}>
                    <DatePicker className="p-2" onChange={onChange} disabledDate={disabledDate} />
                </Col>
                <Col span={6}>
                    <Button className="border-solid border-blue-400 font-semibold" type="primary" size='large' block>Search</Button>
                </Col>
            </Row>
        </div>
    );
};

export default SearchBar;