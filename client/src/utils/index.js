export const timeout = 4000; // Notification dismissal duration.

export const redirectToRoute = route => {
    return () => {
        this.props.history.push(route);
    }
}

export const dismissNotification = () => {
    return {
        type: 'DISMISS_NOTIFICATION',
    };
}