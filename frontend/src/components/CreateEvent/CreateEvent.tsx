/* eslint-disable import/default */
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import './CreateEvent.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

export const CreateEvent = () => {
  return (
    <section className="createEventContainer">
      <div className="createEventCard">
        <form>
          <div>
            <label htmlFor="locationInput">Location</label>
            <input type="text" id="locationInput" />
          </div>
          <div>
            <label htmlFor="eventName">Event Name</label>
            <input type="text" id="eventName" />
          </div>
          <div>
            <label htmlFor="eventDescription">Event Description</label>
            <textarea id="eventDescription"></textarea>
          </div>
        </form>
      </div>
    </section>
  );
};
