import React from 'react';
import ImageGallery from 'react-image-gallery';
import {connect} from "react-redux";
import s from './Photo.module.css'
import './Photo.css'

class Photo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            now: 0,
        }
        this.onSlide = this.onSlide.bind(this)

    }

    onSlide(e) {
        this.setState({
            now: e,
        })
    }

    componentDidMount() {

    }

    render() {

        const images = this.props.images.map(m => {
            return {
                original: m,
                thumbnail: m,
            }
        })

        return (
            <div className={s.photoContainer}>
                <div className={s.photo}>
                    <ImageGallery items={images}
                                  showThumbnails={false}
                                  showPlayButton={false}
                                  autoPlay={false}
                                  onSlide={this.onSlide}
                    />
                </div>
                <a className={s.btn} href={this.props.images[this.state.now]} rel="noopener noreferrer" target={'_blank'}>Увеличить изображение</a>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Photo);
