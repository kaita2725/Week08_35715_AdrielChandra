import React from "react";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {IonPage, IonGrid, IonHeader, IonToolbar, IonTitle,  IonSelect, IonSelectOption, IonContent, IonButtons, IonBackButton, IonLabel, IonIcon, IonRow, IonCol, IonButton, IonInput} from "@ionic/react";
import {camera} from "ionicons/icons";
import {Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {base64FromPath} from '@ionic/react-hooks/filesystem';
import MemoriesContext from '../data/memories-context';

const NewMemories: React.FC = () => {
    const [takenPhoto, setTakenPhoto] = useState<{
      path: string | undefined;
      preview: string;
    }>();

    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
    const titleRef = useRef<HTMLIonInputElement>(null);

    const selectMemoryTypehandler = (event: CustomEvent) => {
      const selectedMemoryType = event.detail.value;
      setChosenMemoryType(selectedMemoryType);
    }

    const memoriesctx = useContext(MemoriesContext);
    const history = useHistory();

    const addMemoryHandler = async () =>{
      const enteredTitle = titleRef.current?.value;
      if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType){
        return;
      }

      const fileName = new Date().getTime() + '.jpeg';
      const base64 = await base64FromPath(takenPhoto!.preview);
      await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Data
      });

      memoriesctx.addMemory(fileName, base64, enteredTitle.toString(), chosenMemoryType);
      if(chosenMemoryType == 'good'){
        history.length > 0 ? history.goBack() : history.replace('/good-memories');
      }
      else if(chosenMemoryType == 'bad')
      {
        history.length > 0 ? history.goBack() : history.replace('/bad-memories');
      }
    }

    const takePhotoHandler = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500
      });
      console.log(photo);

      if(!photo || /* !photo.path || */ !photo.webPath)
      {
        return;
      }

      setTakenPhoto(
        {
          path: photo.path,
          preview: photo.webPath
        });
    };

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/"></IonBackButton>
            </IonButtons>
            <IonTitle>Add New Memories</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Add New Memories</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonRow className="ion-padding">
              <IonCol>
                  <IonLabel>Memory Title</IonLabel>
                  <IonInput type="text" ref={titleRef}></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <div className="image-preview">
                  {!takenPhoto && <h3>No photo choosen</h3>}
                  {takenPhoto && <img src={takenPhoto.preview} alt="Preview"/>}
                </div>
                <IonButton fill = "clear" onClick={takePhotoHandler}>
                  <IonIcon slot="start" icon={camera}></IonIcon>
                  <IonLabel>Take Photo</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonSelect onIonChange={selectMemoryTypehandler} value={chosenMemoryType}>
                  <IonSelectOption value="good">Good Memory</IonSelectOption>
                  <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
            <IonRow className="ion-margin-top">
              <IonCol className="ion-text-center">
                <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
};

export default NewMemories;
