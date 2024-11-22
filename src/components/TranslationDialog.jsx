import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/TranslationDialog.module.css'; // 创建和引入CSS模块

const TranslationDialog = ({ text, onClose, x, y }) => {
  return (
    <div className={styles.dialog} style={{ top: y, left: x }}>
      <div className={styles.dialogContent}>
        <p>{text}</p>
        <button onClick={() => speakText(text)}>Pronunciation</button>
      </div>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
    </div>
  );
};

const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

TranslationDialog.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default TranslationDialog;