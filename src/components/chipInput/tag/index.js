import { Tag, Tooltip } from "antd";
import "./styles.scss";

const CustomTag = (props) => {
  let email = props.email;
  // console.log("email: ", email);
  // if (email.length > 10) {
  //   email[8] = ".";
  //   email[9] = ".";
  //   email[10] = ".";
  // }
  //   console.log("props ", props);

  return (
    <Tag className="tags">
      <div className="tag">
        <Tooltip title={props.email}>
          {email.length > 14 ? email.substring(0, 14) + "..." : email}
        </Tooltip>
      </div>
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
