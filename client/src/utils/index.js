export const timeout = 4000; // Notification dismissal duration.

export const redirectToRoute = (route) => {
    return () => {
        this.props.history.push(route);
    };
};

export const dismissNotification = () => {
    return {
        type: "DISMISS_NOTIFICATION",
    };
};

/*
 * Form Validation for React Front-end...
 */
export const validateForm = (file) => {
    let errors = {};
    let isValidForm = true;

    // Image field validation.
    if (!file) {
        isValidForm = false;
        errors.file = "Pdf file is required";
    } else if (typeof file !== "undefined" && file !== "") {
        let ext = file.type.split("/")[1];
        if (ext !== "pdf") {
            isValidForm = false;
            errors.file = "Please enter *pdf* only.";
        }
    }

    return { isValidForm, errors };
};

export const convertFromBytesTo = (a) => {
    let b = 0,
        c = parseInt(a, 10) || 0;
    for (; 1024 <= c && ++b; ) c /= 1024;
    return (
        c.toFixed(10 > c && 0 < b ? 1 : 0) +
        " " +
        ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][b]
    );
}
