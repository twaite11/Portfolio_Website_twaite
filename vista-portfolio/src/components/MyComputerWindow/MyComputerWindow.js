import React from 'react';
import styles from './MyComputerWindow.module.css';
import FileIcon from '../FileIcon/FileIcon';

// Import the generic icon you added to the assets folder
import fileIcon from '../../assets/file-icon.png';

const MyComputerWindow = () => {
    const files = [
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tyler-waite-956061122/' },
        { name: 'GitHub', href: 'https://github.com/twaite11' },
        { name: 'GitLab', href: 'https://gitlab.com/twaite11' },
        { name: 'Handshake', href: 'https://wgu.joinhandshake.com/profiles/an5hh6' },
        { name: 'Images', href: 'https://www.google.com/search?sca_esv=b1ea5600979d51fe&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeqDdErwP5rACeJAty2zADJjYuUnSkczEhozYdaq1wZrEWeBTRRMkGx8PE2F9zI9kP0W9slwfD0e_E2SCYpxxEsASI-LxkVBvfu-XibWr_YDicyb17E6vKrWBOlLdgfdjFpLOhNCkwKiTYaFviHAaGJoUkT5_nrzWq6VkkQdeHpPTQCkROQ&q=bill+gates&sa=X&sqi=2&ved=2ahUKEwjDkpmo96eQAxWyETQIHczONZAQtKgLegQIExAB&biw=2560&bih=1279&dpr=1' }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.contentArea}>
                {files.map(file => (
                    <FileIcon
                        key={file.name}
                        title={file.name}
                        icon={fileIcon}
                        href={file.href}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyComputerWindow;