import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const BlockedNotification = () => {
  return (
    <div className="flex items-center gap-1 shadow">
        <PrivacyTipIcon fontSize='large'/>
        <strong className='text-sm'>Login Blocked for 2 min</strong>
    </div>
  )
}

export default BlockedNotification