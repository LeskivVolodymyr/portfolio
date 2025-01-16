import styles from './Header.module.scss';

export default function Header() {
    return (
            <div className="px-14 py-6">
                <div className={`text-3xl ${styles.label}`}>VOLODYMYR LESKIV</div>
            </div>
    );
}
