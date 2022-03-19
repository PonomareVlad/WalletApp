const pageEl = document.querySelector('.ion-page');
customElements.define(
    'modal-content',
    class ModalContent extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
          <ion-header translucent>
            <ion-toolbar>
              <ion-title>Modal Content</ion-title>
              <ion-buttons slot="end">
                <ion-button onclick="dismissModal()">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content fullscreen>
            <ion-list>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="https://ionicframework.com/docs/demos/api/modal/avatar-gollum.jpg"/>
                </ion-avatar>
                <ion-label>
                  <h2>Gollum</h2>
                  <p>Sneaky little hobbitses!</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="https://ionicframework.com/docs/demos/api/modal/avatar-frodo.jpg"/>
                </ion-avatar>
                <ion-label>
                  <h2>Frodo</h2>
                  <p>Go back, Sam! I'm going to Mordor alone!</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="https://ionicframework.com/docs/demos/api/modal/avatar-samwise.jpg"/>
                </ion-avatar>
                <ion-label>
                  <h2>Samwise</h2>
                  <p>What we need is a few good taters.</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        `;
        }
    }
);
let currentModal = null;

async function openModal(opts = {}) {
    const modal = await modalController.create({
        component: 'modal-content',
        ...opts,
    });
    modal.present();

    currentModal = modal;
}

function openCardModal() {
    openModal({
        swipeToClose: true,
        presentingElement: pageEl,
    });
}

function dismissModal() {
    if (currentModal) {
        currentModal.dismiss().then(() => {
            currentModal = null;
        });
    }
}

var slides = document.querySelector('ion-slides');

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
slides.options = {
    initialSlide: 1,
    speed: 400
}

async function presentActionSheet() {
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = 'Albums';
    actionSheet.cssClass = 'my-custom-class';
    actionSheet.buttons = [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
            type: 'delete'
        },
        handler: () => {
            console.log('Delete clicked');
        }
    }, {
        text: 'Share',
        icon: 'share',
        data: 10,
        handler: () => {
            console.log('Share clicked');
        }
    }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        data: 'Data value',
        handler: () => {
            console.log('Play clicked');
        }
    }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
            console.log('Favorite clicked');
        }
    }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
            console.log('Cancel clicked');
        }
    }];
    document.body.appendChild(actionSheet);
    await actionSheet.present();

    const {role, data} = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
}

async function presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Alert';
    alert.subHeader = 'Subtitle';
    alert.message = 'This is an alert message.';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();

    const {role} = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
}
