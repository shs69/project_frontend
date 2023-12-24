import { useContext } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Context from '../../../../utils/context'

function Avatar() {

    const fore = useContext(Context)
    return (
        <AvatarEditor
            image={'/profile_icons/2' + fore}
            width={120}
            height={120}
            borderRadius={0}
            border={0}
            scale={0.8}
            onPositionChange={false}
        />
    )
}

export default Avatar 