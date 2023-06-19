/**
 * @name Notion
 * @urlAlias notion.so
 * @urlRegex *://*.notion.so/*
 */
'use strict';

const PROJECT_NAME_PROPERTY = 'Category'
const TAGS_PROPERTY = 'Tags'

function createWrapper (link) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('toggl-button-notion-wrapper');
  wrapper.appendChild(link);

  return wrapper;
}

// Selectors here are madness, it works for as of Dec 4th 2019
// Button renders in popup/dialog view
togglbutton.render(
  '.notion-peek-renderer:not(.toggl)',
  { observe: true },
  function (elem) {

    function getDescription () {
      const descriptionElem = elem.querySelector('.notion-scroller .notion-selectable div[contenteditable="true"]');
      return descriptionElem ? descriptionElem.textContent.trim() : '';
    }

    function getProjectName () {
      try {
        const xpathRes = document.evaluate(`//div[text()="${PROJECT_NAME_PROPERTY}"]`, document, null, XPathResult.ANY_TYPE, null);
        const propertyNameElem = xpathRes.iterateNext();
        const projectNameElem = propertyNameElem.parentNode.parentNode.parentNode.nextElementSibling;
        return projectNameElem && projectNameElem.textContent.trim() != 'Empty' ? projectNameElem.textContent.trim() : '';
      } catch (error) {
        if (error instanceof TypeError && error.message.includes("propertyNameElem is null")) {
          // ignore error
        } else {
          console.log(error)
        }
      }
    }

    function getTags () {
      try {
        const xpathRes = document.evaluate(`//div[text()="${TAGS_PROPERTY}"]`, document, null, XPathResult.ANY_TYPE, null);
        let currElem = xpathRes.iterateNext();
        while (currElem) {
          if (currElem.offsetParent.classList.contains('notion-scroller')) {
            break;
          }
          currElem = xpathRes.iterateNext();
        }
        const propertyNameElem = currElem;
        const tagsElem = propertyNameElem.parentNode.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.firstChild;
        const tags = Array.from(tagsElem.children)
                      .map(child => child.textContent.trim())
                      .filter(textContent => textContent !== 'Empty');
        return tags;
      } catch (error) {
        if (error instanceof TypeError && error.message.includes("propertyNameElem is null")) {
          // ignore error
        } else {
          console.log(error)
        }
      }
    }

    const link = togglbutton.createTimerLink({
      className: 'notion',
      description: getDescription,
      projectName: getProjectName,
      tags: getTags
    });

    const wrapper = createWrapper(link);

    const root = elem.querySelector('.notion-topbar-share-menu');
    if (root) {
      root.parentElement.prepend(wrapper);
    } else {
      elem.querySelector('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)').prepend(wrapper)
    }
  }
);

togglbutton.render(
  '.notion-topbar-action-buttons:not(.toggl)',
  { observe: true },
  function (elem) {
    if (!elem) return;

    elem.style.position = 'relative';

    function getDescription () {
      const controls = document.querySelector('.notion-page-controls');
      const topBar = document.querySelector('.notion-topbar');
      let title = '';

      if (controls) {
        if (controls.nextElementSibling) {
          title = controls.nextElementSibling;
        } else {
          const parent = controls.parentElement;

          if (!parent) return '';

          title = parent ? parent.nextElementSibling : '';
        }
      } else if (topBar) {
        const breadcrumbs = topBar.querySelector('div > .notranslate')
        if (breadcrumbs) {
          title = breadcrumbs.childNodes[breadcrumbs.childNodes.length - 1].querySelector('.notranslate:last-child')
        }
      }

      return title ? title.textContent.trim() : '';
    }

    function getProjectName () {
      try {
        const xpathRes = document.evaluate(`//div[text()="${PROJECT_NAME_PROPERTY}"]`, document, null, XPathResult.ANY_TYPE, null);
        const propertyNameElem = xpathRes.iterateNext();
        const projectNameElem = propertyNameElem.parentNode.parentNode.parentNode.nextElementSibling;
        return projectNameElem && projectNameElem.textContent.trim() != 'Empty' ? projectNameElem.textContent.trim() : '';
      } catch (error) {
        if (error instanceof TypeError && error.message.includes("propertyNameElem is null")) {
          // ignore error
        } else {
          console.log(error)
        }
      }
    }

    function getTags () {
      try {
        const xpathRes = document.evaluate(`//div[text()="${TAGS_PROPERTY}"]`, document, null, XPathResult.ANY_TYPE, null);
        let currElem = xpathRes.iterateNext();
        while (currElem) {
          if (currElem.offsetParent.classList.contains('notion-scroller')) {
            break;
          }
          currElem = xpathRes.iterateNext();
        }
        const propertyNameElem = currElem;
        const tagsElem = propertyNameElem.parentNode.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.firstChild;
        const tags = Array.from(tagsElem.children)
                      .map(child => child.textContent.trim())
                      .filter(textContent => textContent !== 'Empty');
        return tags;
      } catch (error) {
        if (error instanceof TypeError && error.message.includes("propertyNameElem is null")) {
          // ignore error
        } else {
          console.log(error)
        }
      }
    }

    const link = togglbutton.createTimerLink({
      className: 'notion',
      description: getDescription,
      projectName: getProjectName,
      tags: getTags
    });

    const wrapper = createWrapper(link);

    elem.prepend(wrapper);
  }
);
