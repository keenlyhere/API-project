import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session";

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
    }

    const ulClassName = "profile-dropdown";

    return (
        <div>
            <button className="ProfileButton-icon">
                <i class="fa-solid fa-circle-user"></i>
            </button>
            <ul className={ulClassName}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </div>
    )
}
