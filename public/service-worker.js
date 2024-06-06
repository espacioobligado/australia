const installEvent = () => {
    self.addEventListener('install', () => {
      console.log('service worker installed');
    });
  };
  installEvent();
  
  const activateEvent = () => {
    self.addEventListener('activate', () => {
      console.log('service worker activated');
    });
  };
  console.log('Hola')
activateEvent();

//         Installing and activating a service worker