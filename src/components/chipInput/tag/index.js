import { Tag, Tooltip } from "antd";
import "./styles.scss";

const CustomTag = (props) => {
  const email = props.email;

  return (
    <Tag className="tag">
      <Tooltip title={props.email}>
        {email.length > 13 ? email.substring(0, 13) + "..." : email}
      </Tooltip>
      <div onClick={() => props.deleteEmail(props.index)} className="close">
        {
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
            <path
              data-name="Icon material-close"
              d="m15.5 8.306-.806-.806-3.194 3.194L8.306 7.5l-.806.806 3.194 3.194L7.5 14.694l.806.806 3.194-3.194 3.194 3.194.806-.806-3.194-3.194z"
              transform="translate(-7.5 -7.5)"
            />
          </svg>
        }
      </div>
    </Tag>
  );
};

export default CustomTag;
