import "./AboutFooter.css";

export default function About() {
    return (
        <div className="AboutFooter-container">
            <div className="Footer-developer">
                <a href="https://github.com/keenlyhere" target="_blank">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/keenly-chung-b10485257/" target="_blank">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
                © Keenly Chung 2023
            </div>
            <div className="Footer-technologies">
                React | Redux | Express | Sequelize | PostgreSQL | AWS S3 | JavaScript | HTML5 | CSS3
            </div>
        </div>
    )
}
