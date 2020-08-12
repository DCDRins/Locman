import { HasMetaBoundings } from "../models/system";

import ReactDOM from 'react-dom'
import { ReactElement } from "react";
import { HasStyleObject } from "../.types/props";

export default function createContextEnv(contextElement, metaObj: HasMetaBoundings, createListeners: () => void, changeState: ({ style }: HasStyleObject) => void) {
    const { meta: { boundings, pinned } } = metaObj;
    if (!boundings) return;

    const style: React.CSSProperties = {};
    createListeners();
    const node = ReactDOM.findDOMNode(contextElement);

    if (!(node instanceof Element)) return;

    const { width, height } = node.getBoundingClientRect();
    const { offsetWidth, offsetHeight, scrollTop } = document.documentElement;
    // style.top = boundings.top + boundings.height;
    const eps = pinned ? scrollTop : 0;
    style.top = offsetHeight - eps < boundings.bottom + height - eps ? boundings.top - height + eps : boundings.top + boundings.height + eps;
    style.left = offsetWidth < boundings.left + width ? boundings.right - width : boundings.left;
    changeState({ style })
}