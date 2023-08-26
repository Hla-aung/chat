export const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString() + " " + new Date(timestamp).toLocaleTimeString()
}

export const sortUserIds = (user1: string, user2: string) => {
  return [user1, user2].sort().join("--")
} 