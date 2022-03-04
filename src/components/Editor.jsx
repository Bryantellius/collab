import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

const Editor = ({ value, language, onChange, style }) => {
  return (
    <div>
      <AceEditor
        mode={language}
        theme="monokai"
        value={value}
        onChange={onChange}
        name="main_editor"
        style={style}
      />
    </div>
  );
};

export default Editor;
