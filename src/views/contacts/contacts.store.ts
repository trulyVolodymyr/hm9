export const useContactsStore = defineStore('contactsStore', () => {
  const contacts = ref<IContact[]>([])

  const getContacts = () => {
    if (contacts.value.length) return

    return contactsService.getContacts()
      .then(res => {
        contacts.value = res
      })
  }

  function addContact (contact: IContact) {
    contacts.value.push(contact)

    return contactsService.addContact({ name: contact.name, description: contact.description })
      .then((res) => {
        console.log(res)
      })
  }

  function updateContact (contact: IContact) {
    const currentIndex = contacts.value.findIndex(c => c.id === contact.id)
    contacts.value[currentIndex] = { ...contact }

    return contactsService.updateContact(contact)
      .then((res) => {
        console.log(res)
      })
  }

  function deleteContact (contact: IContact) {
    const currentIndex = contacts.value.findIndex(c => c.id === contact.id)
    contacts.value.splice(currentIndex, 1)

    return contactsService.removeContact(contact)
      .then((res) => {
        console.log(res)
      })
  }

  return {
    contacts,
    getContacts,
    addContact,
    deleteContact,
    updateContact

  }
})
