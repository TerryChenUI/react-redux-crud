import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio } from 'antd';

import { config } from '../../../utils';

const FormItem = Form.Item;
let tid = null;

class TagSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleVisibleChange = (e) => {
        this.handleSearch(e.target.value);
    }

    handleKeywordChange = (e) => {
        clearTimeout(tid);
        tid = setTimeout(this.handleSearch, 300);
    }

    handleSearch = (visible) => {
        let values = this.props.form.getFieldsValue();
        if (visible) values.visible = visible;
        if (values.visible === "-1") {
            delete values.visible;
        }
        if (!values.keyword) {
            delete values.keyword;
        }
        this.props.onSearch(values);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // const { labelCol, wrapperCol } = config.searchForm;
        return (
            <Form className="search-form" layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('visible', { initialValue: '-1' })(
                            <Radio.Group onChange={this.handleVisibleChange}>
                                <Radio.Button value="-1">全部</Radio.Button>
                                <Radio.Button value="1">可见</Radio.Button>
                                <Radio.Button value="0">隐藏</Radio.Button>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="关键字">
                    {
                        getFieldDecorator('keyword')(
                            <Input placeholder="标签，Slug，描述" onChange={this.handleKeywordChange} />
                        )
                    }
                </FormItem>
            </Form>
            // <Row gutter={24}>
            //     <Col>
            //         {
            //             getFieldDecorator('visible', { initialValue: '-1' })(
            //                 <Radio.Group onChange={this.handleVisibleChange}>
            //                     <Radio.Button value="-1">全部</Radio.Button>
            //                     <Radio.Button value="1">可见</Radio.Button>
            //                     <Radio.Button value="0">隐藏</Radio.Button>
            //                 </Radio.Group>
            //             )
            //         }
            //     </Col>
            //     <Col {...itemLayout}>
            // {
            //     getFieldDecorator('keyword')(
            //         <Input placeholder="标签，别名，关键字" onChange={this.handleKeywordChange} />
            //     )
            // }
            //     </Col>
            //     {/*<Col className="form-action" {...actionLayout}>
            //         <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            //         <Button onClick={this.handleReset}>重置</Button>
            //     </Col>*/}
            // </Row>
        )
    }
}

TagSearch.propTypes = {
    filter: PropTypes.object,
    onSearch: PropTypes.func,
    onReset: PropTypes.func
}

export default Form.create()(TagSearch);