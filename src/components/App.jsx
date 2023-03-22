import { useEffect, useState } from 'react';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import ContactForm from './form/ContactForm';
import uniqid from 'uniqid';
import css from './App.module.css';
import Header from './header/Header';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    const ID = uniqid.process();
    const string = contacts.filter(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    string.length !== 0
      ? hendleCoincidence(name)
      : setContacts(prevState => [...prevState, { id: ID, name, number }]);
  };

  const hendleCoincidence = name => {
    alert(`${name} is already in contacts`);
  };

  const hendleSearch = event => {
    setFilter(event.currentTarget.value.toLowerCase().trim());
  };

  const hendeleClickDelete = id => {
    setContacts(prevState => prevState.filter(el => el.id !== id));
  };

  return (
    <>
      <Header title={'Phonebook'} />
      <div className={css.container}>
        <ContactForm submit={handleSubmit} contacts={contacts} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={hendleSearch} />
        <ContactList
          contacts={contacts}
          filter={filter}
          remove={hendeleClickDelete}
        />
      </div>
    </>
  );
};

export default App;
