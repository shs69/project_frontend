import AvatarEditor from 'react-avatar-editor'

function Avatar({fore}) {
    return (
        <AvatarEditor
            image={'/profile_icons/2' + fore}
            width={160}
            height={160}
            borderRadius={0}
            border={0}
            scale={0.8}
            onPositionChange={false}
        />
    )
}

export default Avatar 