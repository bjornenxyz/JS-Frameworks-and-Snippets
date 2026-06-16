(() => {
    const blockContextMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    document.addEventListener('contextmenu', blockContextMenu, { passive: false });

  const forbiddenKeys = new Set(['KeyI', 'KeyJ', 'KeyC']);
  const saveKeys = new Set(['KeyS', 'KeyP']);

    document.addEventListener('keydown', (event) => {
        const { ctrlKey, metaKey, shiftKey, code } = event;
        const isModifier = ctrlKey || metaKey;

      if (code === 'F12' || code === 'ContextMenu') {
            return cancelEvent(event);
        }

      if (shiftKey && code === 'F10') {
            return cancelEvent(event);
        }
      
      if (isModifier) {
            if (code === 'KeyU' || saveKeys.has(code)) {
                return cancelEvent(event);
            }
            if (shiftKey && forbiddenKeys.has(code)) {
                return cancelEvent(event);
            }
        }
    }, { capture: true });

    function cancelEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    document.addEventListener('selectstart', blockContextMenu);
    document.addEventListener('dragstart', blockContextMenu);
})();

/*
Kombinera med följande CSS:
body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
*/
