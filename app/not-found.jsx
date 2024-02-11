import Link from "next/link";

const NotFound = () => {
  const page404Styles = {
    width: "100%",
    margin: "0",
    height: "100%",
   
    fontFamily: '"Open Sans - Semibold", sans-serif',
    color: "#000",
  };

  const h1Styles = {
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "25px",
    fontSize: "30px",
    fontWeight: 400,
    textTransform: "uppercase",
  };

  const pStyles = {
    display: "block",
    margin: "25px auto",
    maxWidth: "776px",
    textAlign: "center",
    color: "#404040",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
  };

  const wrapperStyles = {
    position: "relative",
    width: "100%",
    margin: "10px auto 10px",
    maxWidth: "440px",
    minHeight: "410px",
  };

  const linkStyles = {
    display: "block",
    margin: "0 auto",
    width: "260px",
    height: "64px",
    boxShadow: "0 5px 0 #9c1007, inset 0 0 18px rgba(253, 60, 0, 0.75)",
    backgroundColor: "#f95801",
    color: "#fff",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "64px",
    textTransform: "uppercase",
    textDecoration: "none",
    borderRadius: "30px",
    textAlign: "center",
  };

  const linkHoverStyles = {
    backgroundColor: "#ff7400",
  };

  const elStyles = {
    position: "absolute",
    opacity: 1,
    animation: "800ms linear infinite",
    width: "84px",
    height: "106px",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
    zIndex: 2,
  };

  const el1Styles = {
    ...elStyles,
    top: "108px",
    left: "102px",
    backgroundImage:
      'url("https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/404-1.png?raw=true")',
  };

  const el2Styles = {
    ...elStyles,
    top: "92px",
    left: "136px",
    width: "184px",
    backgroundImage:
      'url("https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/404-2.png?raw=true")',
  };

  const el3Styles = {
    ...elStyles,
    top: "108px",
    left: "180px",
    width: "284px",
    backgroundImage:
      'url("https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/404-3.png?raw=true")',
  };

  return (
    <main style={page404Styles} className="bl_page404">
      <h1 style={h1Styles}>Error 404. The page does not exist</h1>
      <p style={pStyles}>
        Sorry! The page you are looking for cannot be found. Perhaps the page
        you requested was moved or deleted. It is also possible that you made a
        small typo when entering the address. Go to the main page.
      </p>
      <div style={wrapperStyles} className="bl_page404__wrapper">
        <img
          src="https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/cloud_warmcasino.png?raw=true"
          alt="cloud_warmcasino.png"
          className="bl_page404__img"
        />
        <div style={el1Styles} className="bl_page404__el1"></div>
        <div style={el2Styles} className="bl_page404__el2"></div>
        <div style={el3Styles} className="bl_page404__el3"></div>
        <Link href="/">
          <div style={linkStyles} className="bl_page404__link">
            Go Home
          </div>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
