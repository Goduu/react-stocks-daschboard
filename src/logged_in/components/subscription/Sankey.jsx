// import React, { useState, useCallback } from 'react';

// import { Sankey } from 'react-vis';
// import { Hint } from 'react-vis';
// import Tooltip from '@material-ui/core/Tooltip';
// import 'react-vis/dist/style.css';

// const BLURRED_LINK_OPACITY = 0.3;
// const FOCUSED_LINK_OPACITY = 0.6;

// const nodes = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }, { name: 'e' }, { name: 'f' }, { name: 'g' },{ name: 'h' },{ name: 'i' },{ name: 'j' }];
// const links = [
//     { source: 0, target: 1, value: 50 },
//     { source: 0, target: 2, value: 45 },
//     { source: 1, target: 3, value: 30 },
//     { source: 1, target: 4, value: 20 },
//     { source: 2, target: 5, value: 5 },
//     { source: 2, target: 6, value: 20 },
//     { source: 2, target: 7, value: 20 },
//     { source: 3, target: 8, value: 10 },
//     { source: 3, target: 9, value: 10 },
    
// ];

// export default function LinkHintSankeyExample() {
//     const [activeLink, setActiveLink] = useState(null)


//     const renderHint = useCallback(() => {

//         // calculate center x,y position of link for positioning of hint
//         const x =
//             activeLink.source.x1 + (activeLink.target.x0 - activeLink.source.x1) / 2;
//         const y = activeLink.y0 - (activeLink.y0 - activeLink.y1) / 2;

//         const hintValue = {
//             [`${activeLink.source.name} ➞ ${activeLink.target.name
//                 }`]: activeLink.value
//         };

//         return <Hint x={x} y={y} value={hintValue} />;
       
//     }, [activeLink])


//     // Note: d3.sankey currently mutates the `nodes` and `links` arrays, which doesn't play nice
//     // with React's single-direction data flow. We create a copy of each before we pass to the sankey
//     // component, just to be sure.
//     return (
//         <div >
//             <Sankey
//                 nodes={nodes.map(d => ({ ...d }))}
//                 links={links.map((d, i) => ({
//                     ...d,
//                     opacity:
//                         activeLink && i === activeLink.index
//                             ? FOCUSED_LINK_OPACITY
//                             : BLURRED_LINK_OPACITY
//                 }))}
//                 width={1000}
//                 height={500}
//                 // do not use voronoi in combination with link mouse over
//                 hasVoronoi={false}
//                 onLinkMouseOver={node => setActiveLink(node)}
//                 onLinkMouseOut={() => setActiveLink(null)}
//             >
//                 {activeLink != null && renderHint()}
//             </Sankey>
//         </div>
//     );
// }