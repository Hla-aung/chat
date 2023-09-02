export const formatTime = (timestamp: number) => {
  return new Intl.DateTimeFormat("default", {timeStyle: "short", dateStyle: "long"}).format(new Date(timestamp))
}

export const sortUserIds = (user1: string, user2: string) => {
  return [user1, user2].sort().join("--")
} 