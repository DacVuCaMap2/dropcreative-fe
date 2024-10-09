// components/TinyMCEEditor.js
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
    onEditorChange: (content: string) => void;
    initialValue: string;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ onEditorChange, initialValue }) => {
    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_API_TINY}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                height: 300,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | image | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;background-color:#f9f9f9 }',
                file_picker_callback: function (cb, value, meta) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.onchange = function () {
                        const file = (input.files as FileList)[0];

                        const reader = new FileReader();
                        reader.onload = function () {
                            const id = 'blobid' + (new Date()).getTime();
                            const blobCache = (window as any).tinymce.activeEditor.editorUpload.blobCache;
                            const base64 = (reader.result as string).split(',')[1];
                            const blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);

                            cb(blobInfo.blobUri(), { title: file.name });
                        };
                        reader.readAsDataURL(file);
                    };

                    input.click();
                }
            }}
        />
    );
};

export default TinyMCEEditor;
