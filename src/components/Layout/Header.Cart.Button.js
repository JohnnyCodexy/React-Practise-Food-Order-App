import { useContext, useState } from "react";
import CartIcon from "../Cart/Cart.icon";
import classes from "./Header.Cart.Button.module.css";
import CartContext from "../../store/cart-context";
import { useEffect } from "react";
const HeaderCartButton = (props) => {
  const [btnisHighlighted, setbtnisHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((sum, cur) => {
    return sum + cur.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnisHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setbtnisHighlighted(true);
    const timer = setTimeout(() => {
      setbtnisHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
