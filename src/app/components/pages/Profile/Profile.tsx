import useAuth from "../../../hooks/useAuth.ts";
import useHeader from "../../../hooks/useHeader.ts";
import styles from "./profile.module.scss"
import {ISubmittedLab} from "../../../types/submittedLab.interface.ts";

const Profile = () => {
    useHeader("Профиль")
    const auth = useAuth();
    const favouriteDisciplines = [];
    const submittedLabs: ISubmittedLab[] = [];
    return (
        <div className={styles.profile}>
            <div className={styles.profile__user}>
                <div className={styles.profile__username}>
                    {auth.user?.lastName} {auth.user?.firstName} {auth.user?.middleName}
                </div>
                <div className={styles.profile__userdata}>
                    {auth.user?.userRole ? `Роль: ${auth.user?.userRole}` : ""}
                    {auth.user?.userGroup ? `Группа: ${auth.user?.userGroup}` : ""}
                </div>
            </div>
            {favouriteDisciplines.length > 0 ?
                <div className={styles.profile__pinned}>
                    <div className={styles.profile__listTitle}>Закреплённые дисциплины</div>
                </div>
                : <></>}
            {submittedLabs.length > 0 ?
                <div className={styles.profile__recent}>
                    <div className={styles.profile__listTitle}>Последние выполненные работы</div>
                    {submittedLabs.map(l => <div key={l.id}>{l.title}</div>)}
                </div>
                : <></>}
        </div>
    );
};
export default Profile;
