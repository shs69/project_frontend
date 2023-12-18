import AvatarEditor from 'react-avatar-editor'

function Avatar({fore}) {
    return (
        <AvatarEditor
            image={'/api/v1/auth/profile_icons/2' + fore}
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