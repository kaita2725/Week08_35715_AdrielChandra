import React from "react";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

const BadMemories: React.FC = () => {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Bad Memories</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Bad Memories</IonTitle>

            </IonToolbar>
          </IonHeader>
          </IonContent>
        </IonPage>
    );
};

export default BadMemories;
