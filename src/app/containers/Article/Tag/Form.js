import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { Form, Button, Row, Col, Input, Checkbox, InputNumber } from 'antd';
const FormItem = Form.Item;

class TagForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.initialValue) {
                    data._id = this.props.initialValue._id;
                }
                this.props.onSubmit(data);
            }
        });
    }

    handleReset() {
        this.props.form.resetFields();
        this.props.onReset();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { initialValue } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
                md: { span: 6 },
                xl: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 8 },
                xl: { span: 4 }
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="标签"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '必填'
                        }],
                        initialValue: initialValue && initialValue.name
                    })(
                        <Input placeholder="文章标签" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="别名"
                >
                    {getFieldDecorator('slug', {
                        rules: [{
                            required: true, message: '必填'
                        }],
                        initialValue: initialValue && initialValue.slug
                    })(
                        <Input placeholder="在URL中使用的别称，建议小写，字母、数字、连字符（-）" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="描述"
                >
                    {getFieldDecorator('description', {
                        initialValue: initialValue && initialValue.description
                    })(
                        <Input type="textarea" rows={4} placeholder="标签描述" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序"
                >
                    {getFieldDecorator('displayOrder', {
                        rules: [{
                            required: true, message: '必填'
                        }],
                        initialValue: initialValue ? initialValue.displayOrder : 1
                    })(
                        <InputNumber min={1} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="可见"
                >
                    {getFieldDecorator('visible', {
                        valuePropName: 'checked',
                        initialValue: initialValue ? initialValue.visible : false
                    })(
                        <Checkbox></Checkbox>
                        )}
                </FormItem>

                {initialValue && initialValue.create_time &&
                    <FormItem
                        {...formItemLayout}
                        label="创建时间"
                    >
                        <span className="ant-form-text">
                            {moment(initialValue.create_time).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                    </FormItem>
                }
                {initialValue && initialValue.create_time &&
                    <FormItem
                        {...formItemLayout}
                        label="更新时间"
                    >
                        <span className="ant-form-text">
                            {moment(initialValue.update_time).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                    </FormItem>
                }
                <FormItem className="form-action" {...tailFormItemLayout}>
                    <Link to='/tag/list'><Button size="large">取消</Button></Link>
                    <Button type="primary" htmlType="submit" size="large">保存</Button>
                </FormItem>
            </Form>
        );
    }

}

export default Form.create()(TagForm);