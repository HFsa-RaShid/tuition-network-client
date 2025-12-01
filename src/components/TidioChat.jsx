import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    // Inject Tidio script only once
    if (!document.getElementById("tidio-script")) {
      const script = document.createElement("script");
      script.src = "//code.tidio.co/btho3eo2fpih5c6dvduiglf8sli3qjzi.js";
      script.async = true;
      script.id = "tidio-script";
      document.body.appendChild(script);
    }

    const handleReady = () => {
      if (window.tidioChatApi && window.tidioChatApi.show) {
        window.tidioChatApi.show();
      }
    };

    // If already loaded, just show
    if (window.tidioChatApi) {
      window.tidioChatApi.show();
    } else {
      document.addEventListener("tidioChat-ready", handleReady);
    }

    // On unmount, hide the widget so it doesn't appear on other pages
    return () => {
      if (window.tidioChatApi && window.tidioChatApi.hide) {
        window.tidioChatApi.hide();
      }
      document.removeEventListener("tidioChat-ready", handleReady);
    };
  }, []);

  return null;
};

export default TidioChat;


