import { useContext } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Context from '../../../../utils/context'

function SmallAvatar() {

    const fore = useContext(Context)
    return (
        <AvatarEditor
            image={'/profile_icons/2' + fore}
            width={60}
            height={60}
            borderRadius={0}
            border={0}
            scale={0.8}
            onPositionChange={false}
        />
    )
}

export default SmallAvatar