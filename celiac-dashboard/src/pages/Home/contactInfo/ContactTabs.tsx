import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import ContactFeedBack from './ContactFeedBack';
import SocialContact from './SocialContact';

function ContactTabs() {
    
  return (
    <Tab.Group>
      <Tab.List className="m-3 flex flex-wrap">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b  hover:text-secondary`}
            >
              معلومات التواصل
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b  hover:text-secondary`}
            >
               قائمة الرسائل
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <SocialContact />
        </Tab.Panel>
        <Tab.Panel>
          <ContactFeedBack />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default ContactTabs;
