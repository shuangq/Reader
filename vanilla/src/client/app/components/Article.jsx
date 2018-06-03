import React from 'react';


const Title = ({ title }) => (
    <h1 className="title">{title}</h1>
);

class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // fetch article content
    }
    render() {
        return (
            <div className="article">
                <div className="container">
                    <div className="header">
                        <h1>The Book of Songs: Poems that helped shape Chinese thought</h1>
                        <p>By <span>Author Name</span></p>
                    </div>
                    <article>
                        {/* {this.props.body} */}
                        <p>Since antiquity, no other text has enjoyed a presence quite like The Book of Songs – in one critic’s words, it is “the classic of the human heart and the human mind.” It is the first poetic anthology of China; Confucius himself is said to have compiled the “three hundred songs”—another early name for the text – out of a body of 3,000, “removing duplicates and choosing only what could be matched to the principles of ritual”. By the end of the Western Han dynasty (202 BCE-9 CE), there were no fewer than four schools of the Songsat the imperial academy, offering a range of different interpretations for each song.</p>
                        <p>In the same way that Homer’s epics took hold within the West, The Book of Songs played a role in spheres far beyond literature, with a lasting influence on Chinese civilisation. The collection had an impact on education, politics and communal life: in antiquity, the Songs were quoted and recited as coded communication in diplomatic exchange; invoked as proof to cap a philosophical argument; read as commentary – satirical more often than not – on historical circumstances; and taught for the purposes of moral edification. It has continued to affect Chinese society since then, both through what the Songs say and the form they take.</p>
                        <blockquote>Many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory </blockquote>
                        <p>The received anthology emerged from the “Mao tradition”, one of the four early schools, and is divided into four parts: 160 Airs (guofeng), 74 Minor Court Hymns (xiaoya), 31 Major Court Hymns (daya), and 40 Eulogies (song). Within the Eulogies, the 31 Eulogies of Zhou are considered the oldest segment of the anthology, purportedly dating back to the very early years of the Western Zhou (1046-771 BCE) dynasty.</p>
                        <p>These hymns, all of them rather short, were performed in sacrifices to the Zhou royal ancestors: multimedia performances containing the aromatic offerings of meat, grain and alcohol; ritual music on drums and bells, wind and string instruments; dance to re-enact the military conquest of the previous Shang dynasty; and the solemn hymns by which the Zhou king praised his ancestors and requested their blessings in return. In short, Chinese poetry begins in religious ritual.</p>
                        <p>By accompanying rites, in turn, the Eulogies helped regulate social order. Respecting ‘heaven’s will’ was an important element of ancient Chinese politics; by enforcing this message, the Book of Songs could underpin the rule of the Zhou Dynasty. Unlike the Eulogies, many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory. Like the archaic Eulogies, the Hymns are straightforward; there is no debate about the story they are meant to tell.</p>
                    </article>
                </div>
            </div>
        )
    }
}

export default Article;
