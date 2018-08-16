import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Select, message } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const createFormField = Form.createFormField;

const CustomInput = ({ getFieldProps }) => {
  return (
    <FormItem label="邮箱">
      <Input
        {...getFieldProps("email", {
          rules: [
            { required: true, message: "必须输入邮箱!" },
            {
              type: "email",
              message: "邮箱格式不对!"
            }
          ]
        })}
      />
    </FormItem>
  );
};

const CustomSelect = ({ getFieldProps }) => {
  return (
    <FormItem label="职业">
      <Select
        {...getFieldProps("occ", {
          rules: [{ required: true, message: "必须选择职业!" }]
        })}
      >
        <Option value="1">医生</Option>
        <Option value="2">老师</Option>
        <Option value="3">码农</Option>
      </Select>
    </FormItem>
  );
};

const CustomForm = Form.create({
  mapPropsToFields(props) {
    const {
      fields: { occ, email }
    } = props;
    return {
      occ: createFormField({ value: occ }),
      email: createFormField({ value: email })
    };
  }
})(({ form }) => {
  function handleClick() {
    form.validateFields((err, values) => {
      console.log(err, values);
      if (err) {
        message.error("表单填写有误");
      } else {
        message.success("表单验证通过");
      }
    });
  }

  return (
    <div>
      <Form>
        <CustomInput getFieldProps={form.getFieldProps} />
        <CustomSelect getFieldProps={form.getFieldProps} />
      </Form>
      <Button onClick={handleClick}>提交</Button>
    </div>
  );
});

class Demo extends React.Component {
  state = {
    fields: {
      email: "",
      occ: undefined
    }
  };

  constructor(props) {
    super(props);
    // 模拟异步加载表单数据
    setTimeout(() => {
      this.setState({
        fields: {
          email: "789@qq.com",
          occ: "1"
        }
      });
    }, 3000);
  }

  render() {
    const { fields } = this.state;
    return (
      <div>
        <CustomForm fields={fields} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
