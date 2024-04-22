class NotificationContext {
  constructor() {
    this.notifications = [];
  }

  hasNotifications() {
    return this.notifications.length > 0;
  }

  addNotification(notification) {
    this.notifications.push(notification);
  }
}

module.exports = NotificationContext;
