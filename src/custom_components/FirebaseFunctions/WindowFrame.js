import WriteData from "./WriteData";
import UpdateData from "./UpdateData";

/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, Gaudenz Alder
 *
 * Usage: DiagramEditor.editElement(elt) where elt is an img or object with
 * a data URI src or data attribute or an svg node with a content attribute.
 *
 *
 * See https://jgraph.github.io/drawio-integration/javascript.html
 */

// This the file that will allow draw.io to compress and decompress the xml.
// It will also close the frame and save the data to the database if it detects the exit button

var pako = require('pako')

function DiagramEditor(config, ui, done)
{
    this.config = (config != null) ? config : this.config;
    this.done = (done != null) ? done : this.done;
    this.ui = (ui != null) ? ui : this.ui;
    var self = this;

    this.handleMessageEvent = function(evt)
    {
        if (self.frame != null && evt.source === self.frame.contentWindow &&
            evt.data.length > 0)
        {
            try
            {
                var msg = JSON.parse(evt.data);

                if (msg != null)
                {
                    self.handleMessage(msg);
                }
            }
            catch (e)
            {
                console.error(e);
            }
        }
    };
};

/**
 * Static method to edit the diagram in the given img or object.
 */

var lib_link = '';
var user = '';
var project = '';
let setFrame;

DiagramEditor.editElement = function(elt, lib, email, project_id, setFrameFunct, config, ui, done)
{
    lib_link = lib;
    user = email;
    project = project_id;
    setFrame = setFrameFunct
    return new DiagramEditor(config, ui, done).editElement(elt);
};

/**
 * Global configuration.
 */
DiagramEditor.prototype.config = null;

/**
 * Protocol and domain to use.
 */
DiagramEditor.prototype.drawDomain = 'https://embed.diagrams.net/';

/**
 * UI theme to be use.
 */
DiagramEditor.prototype.ui = 'min';

/**
 * Format to use.
 */
DiagramEditor.prototype.format = 'xml';

/**
 * Specifies if libraries should be enabled.
 */
DiagramEditor.prototype.libraries = true;

/**
 * CSS style for the iframe.
 */
DiagramEditor.prototype.frameStyle = 'border:0;width:100%;height:100%;';

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.editElement = function(elem)
{
    var src = this.getElementData(elem);
    this.startElement = elem;
    var fmt = this.format;

    fmt = 'xmlsvg';

    this.startEditing(src, fmt);

    return this;
};

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.getElementData = function(elem)
{
    var name = elem.nodeName.toLowerCase();

    return elem.getAttribute((name === 'svg') ? 'content' :
        ((name === 'img') ? 'src' : 'data'));
};

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.setElementData = function(elem, data)
{
    var name = elem.nodeName.toLowerCase();

    if (name === 'svg')
    {
        elem.outerHTML = atob(data.substring(data.indexOf(',') + 1));
    }
    else
    {
        elem.setAttribute((name === 'img') ? 'src' : 'data', data);
    }

    return elem;
};

/**
 * Starts the editor for the given data.
 */
DiagramEditor.prototype.startEditing = function(data, format, title)
{
    if (this.frame == null)
    {
        window.addEventListener('message', this.handleMessageEvent);
        this.format = (format != null) ? format : this.format;
        this.title = (title != null) ? title : this.title;
        this.data = data;

        this.frame = this.createFrame(
            this.getFrameUrl(),
            this.getFrameStyle());
        document.getElementById('iframe').classList.add('padding-top');
        document.getElementById('iframe').appendChild(this.frame);
        document.getElementById('image').classList.add('none');
        this.setWaiting(true);
    }
};

/**
 * Updates the waiting cursor.
 */
DiagramEditor.prototype.setWaiting = function(waiting)
{
    if (this.startElement != null)
    {
        // Redirect cursor to parent for SVG and object
        var elt = this.startElement;
        var name = elt.nodeName.toLowerCase();

        if (name === 'svg' || name === 'object')
        {
            elt = elt.parentNode;
        }

        if (elt != null)
        {
            if (waiting)
            {
                this.frame.style.pointerEvents = 'none';
                this.previousCursor = elt.style.cursor;
                elt.style.cursor = 'wait';
            }
            else
            {
                elt.style.cursor = this.previousCursor;
                this.frame.style.pointerEvents = '';
            }
        }
    }
};

/**
 * Updates the waiting cursor.
 */
DiagramEditor.prototype.setActive = function(active)
{

};

/**
 * Removes the iframe.
 */
DiagramEditor.prototype.stopEditing = function()
{
    if (this.frame != null)
    {
        window.removeEventListener('message', this.handleMessageEvent);
        document.getElementById('iframe').removeChild(this.frame);
        document.getElementById('iframe').classList.remove('padding-top');
        document.getElementById('image').classList.remove('none');
        this.setActive(false);
        this.frame = null;
    }
};

/**
 * Send the given message to the iframe.
 */
DiagramEditor.prototype.postMessage = function(msg)
{
    if (this.frame != null)
    {
        this.frame.contentWindow.postMessage(JSON.stringify(msg), '*');
    }
};

/**
 * Returns the diagram data.
 */
DiagramEditor.prototype.getData = function()
{
    return this.data;
};

/**
 * Returns the title for the editor.
 */
DiagramEditor.prototype.getTitle = function()
{
    return this.title;
};

/**
 * Returns the CSS style for the iframe.
 */
DiagramEditor.prototype.getFrameStyle = function()
{
    return this.frameStyle;
};

/**
 * Returns the URL for the iframe.
 */
DiagramEditor.prototype.getFrameUrl = function()
{
    let lib = '&clibs=U' + lib_link;

    var url = this.drawDomain + '?embed=1&proto=json&spin=1' + (lib === '&clibs=U' ? '' : lib);

    if (this.ui != null)
    {
        url += '&ui=' + this.ui;
    }

    if (this.libraries != null)
    {
        url += '&libraries=1';
    }

    if (this.config != null)
    {
        url += '&configure=1';
    }

    return url;
};

/**
 * Creates the iframe.
 */
DiagramEditor.prototype.createFrame = function(url, style)
{
    var frame = document.createElement('iframe');
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('style', style);
    frame.setAttribute('src', url);

    return frame;
};

/**
 * Sets the status of the editor.
 */
DiagramEditor.prototype.setStatus = function(messageKey, modified)
{
    this.postMessage({action: 'status', messageKey: messageKey, modified: modified});
};

function bytesToString(arr)
{
    var str = '';

    for (var i = 0; i < arr.length; i++)
    {
        str += String.fromCharCode(arr[i]);
    }

    return str;
}

function createXmlDocument()
{
    var doc = null;

    if (document.implementation && document.implementation.createDocument)
    {
        doc = document.implementation.createDocument('', '', null);
    }
    /*else if (window.ActiveXObject)
    {
        doc = new ActiveXObject('Microsoft.XMLDOM');
    }*/

    return doc;
}

function parseXml(xml)
{
    if (window.DOMParser)
    {
        var parser = new DOMParser();

        return parser.parseFromString(xml, 'text/xml');
    }
    else
    {
        var result = createXmlDocument();

        result.async = 'false';
        result.loadXML(xml);

        return result;
    }
}

function getTextContent(node)
{
    return (node != null) ? node[(node.textContent === undefined) ? 'text' : 'textContent'] : '';
}

function decode(data)
{
    try
    {
        var node = parseXml(data).documentElement;

        if (node != null && node.nodeName === 'mxfile')
        {
            var diagrams = node.getElementsByTagName('diagram');

            if (diagrams.length > 0)
            {
                data = getTextContent(diagrams[0]);
            }
        }
    }
    catch (e)
    {
        // ignore
    }

    if (true)
    {
        try
        {
            data = atob(data);
        }
        catch (e)
        {
            console.log(e);
            alert('atob failed: ' + e);

            return;
        }
    }

    if (true)
    {
        try
        {
            data = bytesToString(pako.inflateRaw(data));
        }
        catch (e)
        {
            console.log(e);
            alert('inflateRaw failed: ' + e);

            return;
        }
    }

    if (true)
    {
        try
        {
            data = decodeURIComponent(data);
        }
        catch (e)
        {
            console.log(e);
            alert('decodeURIComponent failed: ' + e);

            return;
        }
    }
}

/**
 * Handles the given message.
 */

let saved = false;

DiagramEditor.prototype.handleMessage = function(msg)
{
    console.log(msg.event)
    console.log(saved)
    if (msg.event === 'configure')
    {
        this.configureEditor();
    }
    else if (msg.event === 'init')
    {
        this.initializeEditor();
    }
    else if (msg.event === 'autosave')
    {
        this.save(msg.xml, true, this.startElement);
    }
    else if (msg.event === 'export')
    {
        this.save(msg.data, false, this.startElement);
        this.stopEditing();
    }
    else if (msg.event === 'save')
    {
        var contentXML=msg.xml;
        console.log(contentXML)
        var decodedXML=decode(contentXML);
        console.log(decodedXML)

        setFrame();

        saved = true;

        if (msg.exit)
        {
            msg.event = 'exit';
        }
        else
        {
            this.setStatus('allChangesSaved', false);
        }
    }

    if (msg.event === 'exit')
    {
        setFrame();

        if ((this.format !== 'xml' && !msg.modified) && saved)
        {
            this.postMessage({action: 'export', format: this.format,
                xml: msg.xml, spinKey: 'export'});
            saved = false;
        }
        else
        {
            //this.save(msg.xml, false, this.startElement);
            this.stopEditing(msg);
        }
    }
};

/**
 * Posts configure message to editor.
 */
DiagramEditor.prototype.configureEditor = function()
{
    this.postMessage({action: 'configure', config: this.config});
};

/**
 * Posts load message to editor
 */
DiagramEditor.prototype.initializeEditor = function()
{
    this.postMessage({action: 'load',autosave: 1, saveAndExit: '1',
        modified: 'unsavedChanges', xml: this.getData(),
        title: this.getTitle()});
    this.setWaiting(false);
    this.setActive(true);
};

/**
 * Saves the given data.
 */
DiagramEditor.prototype.save = function(data, draft, elt)
{
    if (elt != null && !draft)
    {
        this.setElementData(elt, data);
        this.done(data, draft, elt);

        UpdateData(user, 'Projects/' + project, {'StepTwo': data});
    }
};

/**
 * Invoked after save.
 */
DiagramEditor.prototype.done = function()
{
    // hook for subclassers
};

export default DiagramEditor;