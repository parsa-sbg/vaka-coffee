import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styles from '@/css/quill.module.css';

type Props = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
};

function ArticleEditor({ content, setContent }: Props) {
    const modules = {
        toolbar: [
            [{ size: ['small', false, 'large'] }],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            ['image'],
            ['link'],
            [{ color: ['#f0f0f0f', '#fff', '#d19960', 'red', 'green', 'blue', 'brown'] }],
            [{ background: [] }],
        ],
    };

    const { quill, quillRef } = useQuill({ modules });

    useEffect(() => {
        if (quill) {
            quill.on('editor-change', () => {
                setContent(quill.root.innerHTML);
            });
        }
    }, [quill, setContent]);

    useEffect(() => {
        if (quill && content !== quill.root.innerHTML) {
            quill.clipboard.dangerouslyPasteHTML(content);
        }
    }, [quill, content]);

    return (
        <div className="min-h-96 !rounded-lg !overflow-hidden border" dir="ltr">
            <div className={`min-h-96 !font-vazir resetEditor ${styles.resetEditor}`} style={{fontSize: 'inherit'}} ref={quillRef} dir="rtl" />
        </div>
    );
}

export default ArticleEditor;