const pageEl = document.querySelector('.ion-page');
customElements.define(
    'modal-content',
    class ModalContent extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
          <ion-header translucent>
            <ion-toolbar>
              <ion-title>Концерт</ion-title>
              <ion-buttons slot="end">
                <ion-button onclick="dismissModal()">Закрыть</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content fullscreen>
            <img src="https://cache.cultozon.ru/images/raw/a365fc33-f9bd-40f0-b540-e1941946c0ea.jpg"/>
            <div class="ion-margin-horizontal">
            <h1>Спектакль-концерт Последний Герой, Легендарные хиты группы КИНО</h1>
            <div class="is-organizer">Билеты от организатора. Без наценок и сборов.</div>
            <br>
            <ion-button expand="block">800 - 2800 ₽</ion-button>
            <br>
            <h2>Описание</h2>
            <p>Музыкальное действо "Последний герой", созданный в необычном жанре спектакля - концерта, исполнен профессиональными музыкантами. Пронзительные и простые истории из жизни Виктора Цоя, музыкантов группы "Кино" и их фанатов, людей которые любили и любят эту музыку. Истории - штрихи к портрету кумира миллионов . Факты его жизни, серьёзные, забавные, грустные случаи, немного мистики и конечно же песни, которые будут подпевать все зрители в зале.</p>
</div>
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
