import style from "./footer.module.css";

export default function Footer() {
  return (
    <div className={style.footer_container}>
      <div className={style.footer_section}>
        <div className={style.section_name}>Contacts:</div>
        <div>Telegram</div>
        <div>Email</div>
      </div>
      <div className={style.footer_section}>
        <div className={style.section_name}>About:</div>
        <div>Telegram</div>
        <div>Email</div>
      </div>
      <div className={style.footer_section}>
        <div className={style.section_name}>
          Acknowledgements and Trademarks:
        </div>
        <div>TMDB</div>
        <div>OPENSUBS</div>
      </div>
    </div>
  );
}
