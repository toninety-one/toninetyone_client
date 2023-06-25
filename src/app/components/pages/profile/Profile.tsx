import useAuth from "../../../hooks/useAuth.ts";
import useHeader from "../../../hooks/useHeader.ts";
import styles from "./profile.module.scss"
import {useNavigate} from "react-router-dom";

const Profile = () => {
    useHeader("Профиль")
    const auth = useAuth();
    const favouriteDisciplines = [];
    const navigate = useNavigate();

    return (
        <div className={styles.profile}>
            <div className={styles.profile__user}>
                <div className={styles.profile__username}>
                    {auth.user?.lastName} {auth.user?.firstName} {auth.user?.middleName}
                </div>
                <div className={styles.profile__userdata}>
                    <span
                        className={styles.profile__dataParam}>{auth.user?.userRole ? `Роль: ${auth.user?.userRole}` : ""}</span>
                    <span
                        className={styles.profile__dataParam}>{auth.user?.userGroup ? `Группа: ${auth.user?.userGroup.title}` : ""}</span>
                </div>
            </div>
            {favouriteDisciplines.length > 0 ?
                <div className={styles.profile__pinned}>
                    <div className={styles.profile__listTitle}>Закреплённые дисциплины</div>
                </div>
                : <></>}
            {auth.user?.lastSubmittedLabs && auth.user.lastSubmittedLabs.length > 0 ?
                <div className={styles.profile__recent}>
                    <div className={styles.profile__listTitle}>Последние выполненные работы</div>
                    <div className={styles.profile__list}>
                        {auth.user.lastSubmittedLabs.map(l => <div className={styles.profile__listItem}
                                                                   key={l.id}
                                                                   onClick={() => navigate(`/labwork/${l.labWorkId}/${l.id}`)}>{l.title}</div>)}
                    </div>
                </div>
                : <></>}
        </div>
    );
};
export default Profile;
