export namespace Event {
  export type IGetEventResponse = {
    id: string
    title: string
    description: string
    eventDate: Date
    location: string
    visibility: string
    slug: string
    organizerId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }
}
