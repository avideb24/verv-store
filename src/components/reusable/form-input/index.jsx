"use client";

import React from "react";
import {
    Input,
    Select,
    Radio,
    Checkbox,
    DatePicker,
    Form,
    Upload,
    Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const FormInput = ({
    label,
    name,
    type = "text",
    options = [],
    placeholder = "",
    Required = false,
    value,
    onChange,
    ...rest
}) => {
    const inputStyle = { borderRadius: "4px" };

    // Custom onChange handlers for different input types to normalize values
    const handleChange = (val) => {
        if (onChange) {
            // For Select: val is value
            // For Input: val is event, so val.target.value
            if (type === "select" || type === "radio") {
                onChange(val);
            } else if (type === "checkbox") {
                onChange(val.target.checked);
            } else if (val && val.target) {
                onChange(val.target.value);
            } else {
                onChange(val);
            }
        }
    };

    return (
        <Form.Item
            label={label}
            rules={Required ? [{ required: true, message: `${label} is required` }] : []}
            labelCol={{ span: 24, style: { marginBottom: 0, paddingBottom: 5 } }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: 0 }}
        >
            {type === "text" && (
                <Input
                    placeholder={placeholder}
                    style={inputStyle}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "number" && (
                <Input
                    type="number"
                    placeholder={placeholder}
                    style={{ ...inputStyle, appearance: "none", MozAppearance: "textfield" }}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "textarea" && (
                <TextArea
                    rows={4}
                    placeholder={placeholder}
                    style={inputStyle}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "select" && (
                <Select
                    placeholder={placeholder}
                    style={{ width: "100%", ...inputStyle }}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                >
                    {options.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            )}

            {type === "radio" && (
                <Radio.Group value={value} onChange={handleChange} {...rest}>
                    {options.map((option) => (
                        <Radio key={option.value} value={option.value}>
                            {option.label}
                        </Radio>
                    ))}
                </Radio.Group>
            )}

            {type === "checkbox" && (
                <Checkbox checked={value} onChange={handleChange} {...rest}>
                    {label}
                </Checkbox>
            )}

            {type === "date" && (
                <DatePicker
                    style={inputStyle}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "datepicker" && (
                <DatePicker
                    showTime
                    style={inputStyle}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "daterange" && (
                <RangePicker
                    style={inputStyle}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "email" && (
                <Input
                    type="email"
                    placeholder={placeholder}
                    style={inputStyle}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "password" && (
                <Input.Password
                    placeholder={placeholder}
                    style={inputStyle}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {type === "image" && (
                <Upload name={name} listType="picture" beforeUpload={() => false} {...rest}>
                    <Button icon={<UploadOutlined />} style={inputStyle}>
                        Upload Image
                    </Button>
                </Upload>
            )}

            {type === "file" && (
                <Upload name={name} beforeUpload={() => false} {...rest}>
                    <Button icon={<UploadOutlined />} style={inputStyle}>
                        Upload File
                    </Button>
                </Upload>
            )}

            {type === "color" && (
                <Input
                    type="color"
                    style={{ ...inputStyle, width: "100%", height: "40px" }}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
            )}
        </Form.Item>
    );
};

export default FormInput;
