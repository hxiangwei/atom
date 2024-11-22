import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { GlobalWorkerOptions } from 'pdfjs-dist';

import TranslationDialog from './TranslationDialog';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import styles from '../css/PdfReaderComponent.module.css'; // 引入CSS模块

const PdfReaderComponent = () => {
  useEffect(() => {
    GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;
  }, []);

  const [fileUrl, setFileUrl] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);
    }
  };

  return (
    <div className={styles.pdfReaderContainer}>
      {!fileUrl ? (
        <div className={styles.buttonContainer}>
          <button
            onClick={() => document.getElementById('file-input').click()}
            className={styles.openFileBtn}
          >
            Open PDF
          </button>
        </div>
      ) : (
        <PDFViewer fileUrl={fileUrl} />
      )}
      <input
        type="file"
        id="file-input"
        accept=".pdf"
        className={styles.hiddenInput}
        onChange={onFileChange}
      />
    </div>
  );
};

const PDFViewer = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [selectionDetails, setSelectionDetails] = useState({ text: '', x: 0, y: 0, show: false });
  const previousSelectedTextRef = useRef('');
  const viewerRef = useRef(null);
  const toolbarRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const handleMouseUp = (event) => {
      if (event.button !== 0) {
        return;
      }

      requestAnimationFrame(() => {
        const selectedText = window.getSelection().toString();
        if (selectedText && selectedText !== previousSelectedTextRef.current && selectedText.trim() !== '') {
          console.log(`pre:${previousSelectedTextRef.current}, current:${selectedText}. equal: ${previousSelectedTextRef.current === selectedText}`);
          const selectionRange = window.getSelection().getRangeAt(0).getBoundingClientRect();
          const viewerRect = viewerRef.current.getBoundingClientRect();

          const posX = (selectionRange.left + selectionRange.right) / 2 - viewerRect.left - 50;
          const posY = selectionRange.top - viewerRect.top - 30;

          previousSelectedTextRef.current = selectedText;
          setSelectionDetails({
            text: selectedText,
            x: posX,
            y: posY,
            show: true,
          });
        } else if (!selectedText) {
          setShowDialog(false);
          setSelectionDetails({ text: '', x: 0, y: 0, show: false });
          previousSelectedTextRef.current = '';
        }
      });
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleTranslate = () => {
    const text = selectionDetails.text;
    setShowDialog(true);
    console.log(`Translating: ${text}`);
  };

  const handleAsk = () => {
    const text = selectionDetails.text;
    console.log(`Asking about: ${text}`);
  };

  return (
    <div
      ref={viewerRef}
      style={{ height: '750px', position: 'relative' }}
    >
      <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
      {selectionDetails.show && (
        <div
          ref={toolbarRef}
          className={styles.selectionToolbar}
          style={{
            top: selectionDetails.y,
            left: selectionDetails.x,
            position: 'absolute',
            zIndex: 1000,
          }} // 确保位置准确且在最上层
        >
          <button onClick={handleTranslate}>Translate</button>
          <button onClick={handleAsk}>Ask</button>
        </div>
      )}
      {showDialog && (
        <TranslationDialog
          text={selectionDetails.text}
          x={selectionDetails.x}
          y={selectionDetails.y + 30}
          onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
};

PDFViewer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
};

export default PdfReaderComponent;