function Task({id, title, description, user, createAt, category}) {
    this.id = id || Date.now()
    this.title = title
    this.description = description
    this.user = user
    this.createAt = createAt || new Date().toLocaleString()
    this.category = category
}

export { Task }
