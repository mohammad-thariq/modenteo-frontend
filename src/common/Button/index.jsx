import "../../styles/button.css";
import { ThreeDots } from "react-loader-spinner";

export const Button = ({
  name,
  bg,
  type,
  color,
  onClick,
  isSubmitting,
  border,
  w,
  style,
}) => {
  return (
    <div style={style}>
      <button
        onClick={onClick}
        type={type}
        style={{ background: bg, color: color, border: border }}
        className={`btn-wrapper w-${w || "100"} mt-2 mb-2`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ThreeDots
            color="#fff"
            wrapperStyle={{ justifyContent: "center" }}
            height={20}
            width={40}
          />
        ) : (
          name
        )}
      </button>
    </div>
  );
};
