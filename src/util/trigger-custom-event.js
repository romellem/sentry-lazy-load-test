/**
 * @param {Element} element
 * @param {String} event_type
 * @param {Object} [optional_data]
 * @returns {Event}
 */
function triggerCustomEvent(element, event_type, optional_data) {
  let event;
  if (window.CustomEvent && typeof window.CustomEvent === "function") {
    event = new CustomEvent(
      event_type,
      optional_data ? { detail: optional_data } : undefined
    );
  } else {
    // IE fallback
    event = document.createEvent("CustomEvent");
    event.initCustomEvent(event_type, true, true, optional_data);
  }

  element.dispatchEvent(event);
  return event;
}

export default triggerCustomEvent;
